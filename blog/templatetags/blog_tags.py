#encoding:utf-8
import json
from django import template
from blog.models import Article
register = template.Library()

@register.assignment_tag
def get_cloud_tags():
    max_return_num = 20

    articles = Article.objects.all()
    tag_count = {}
    for item in articles:
        for tag in item.get_tags():
            if tag not in tag_count:
                tag_count[tag] = 1
            else:
                tag_count[tag] += 1
    tags = sorted(tag_count.items(), key = lambda x: x[1], reverse = True)
    tags = [item[0] for item in tags]
    return json.dumps(tags[:max_return_num])

