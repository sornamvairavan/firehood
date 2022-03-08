import os
from flask import Blueprint
from flask_login import login_required
import finnhub


FIN_KEY = os.environ.get("FIN_KEY")
FIN_KEY2 = os.environ.get("FIN_KEY2")

news_routes = Blueprint('news', __name__)

finnhub_client = finnhub.Client(api_key={FIN_KEY})
finnhub2_client = finnhub.Client(api_key={FIN_KEY2})

@news_routes.route("/")
@login_required
def get_news():
    try:
        data = finnhub_client.general_news('general', min_id=0)
    except:
        try:
            data = finnhub2_client.general_news('general', min_id=0)
        except:
            return {"errors": ["No news available at this time"]}

    top10 = data[:10]

    return {"news": [news for news in top10]}