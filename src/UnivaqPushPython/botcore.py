#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Core module
"""

import os
import time
from libs import utils
from libs import news


def main():
    """Defining the main function"""
    logger = utils.get_logger(os.environ['DEBUG'])

    utils.db_connection()
    utils.get_news()

    logger.info('Started')

    while True:
        news.notify_news()
        time.sleep(30)

if __name__ == '__main__':
    main()
