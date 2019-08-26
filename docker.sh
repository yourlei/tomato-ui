#!/bin/bash

sudo docker run -dit \
--name ts-tomato \
-p 8000:8000 \
-v $PWD:/var/www/ \
-w /var/www \
registry.cn-hangzhou.aliyuncs.com/ibbd/node
