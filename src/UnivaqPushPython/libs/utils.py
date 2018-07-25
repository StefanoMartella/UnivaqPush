#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""The package that contains groups all the functions needed by other scripts."""

import logging
import os
import pymongo

DATABASE = ""
NEWS = {}


def db_connection():
    """Get MongoDB connection"""

    try:
        conn = pymongo.MongoClient(os.environ['MONGODB_URI'])
        print("Connected successfully!")
    except (pymongo.errors.ConnectionFailure) as err:
        print("Could not connect to MongoDB: %s" % err)

    global DATABASE
    DATABASE = conn.get_default_database()

def get_news():
    """Get all the news"""

    global NEWS
    NEWS = DATABASE['news'].find_one({}, {'_id': False})

def store_news(data):
    """Store all the news"""

    DATABASE['news'].remove({})
    DATABASE['news'].insert(data)

def get_logger(debug):
    """Get logger object"""

    logging.basicConfig(
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        level=logging.INFO
    )
    logger = logging.getLogger(__name__)

    if debug is False:
        logging.disable(logging.CRITICAL)

    return logger
