#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""Useful functions to get and send news"""

import os
import json
import time
import requests
from libs import utils
from libs.news_scrapers import disim, univaq

def pull_news():
    """This function is built to pull 5 news from all the websites"""

    scrapers = {
        'disim': lambda: disim.scraper(
            ["http://www.disim.univaq.it/main/news.php?entrant=1",
             "http://www.disim.univaq.it/main/news.php?entrant=2"]),
        'univaq': lambda: univaq.scraper(
            ["http://www.univaq.it/news_archive.php?tipo=In%20evidenza",
             "http://www.univaq.it/news_archive.php?tipo=Ultimissime"])
    }
    news = {}

    for key in scrapers:
        news[key] = scrapers[key]()

    return news


def check_news():
    """This function checks if there are some unread news from the website"""

    pulled_news = pull_news()
    stored_news = utils.NEWS
    unread_news = {}

    # TODO _id field coming back don't know why
    for section in stored_news:
        if section != '_id':
            index = (10 if section == 'univaq' else 5)
            unread_news[section] = ([x for x in pulled_news[section][0: index]
                                     if x not in stored_news[section]])

    return {'unread_news': unread_news,
            'pulled_news': pulled_news}


def notify_news():
    """Defining method that will be repeated over and over"""

    rest_api = os.environ['REST_API']

    headers = {"Authorization": "Basic %s" % rest_api,
               "Content-Type" : "application/json"}

    url = "https://onesignal.com/api/v1/notifications"



    translation = {
        'disim': 'Disim',
        'univaq': 'Univaq'
    }

    checked = check_news()
    unread_news = checked['unread_news']
    pulled_news = checked['pulled_news']

    for section in unread_news:
        if unread_news[section]:

            utils.NEWS = pulled_news
            utils.store_news(pulled_news)

            for item in unread_news[section]:

                current_milliseconds = int(round(time.time() * 1000))

                data = {

                    "app_id"            : "7de74f29-ee10-4a90-aa2a-e74c1ff9342d",
                    "included_segments" : [translation[section]],
                    "headings"          : {"en"     : item['title']},
                    "contents"          : {"en"     : item['description']},
                    "data"              : {"link"   : item['link'],
                                           "section": section,
                                           "date"   : current_milliseconds},
                    "large_icon"        : "message_icon"

                }

                requests.post(url=url, headers=headers, data=json.dumps(data))
