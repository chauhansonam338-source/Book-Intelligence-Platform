from django.urls import path
from . import views

urlpatterns = [ 
    path('', views.test_api),
    path('books/', views.get_books),
    path('books/<int:id>/', views.get_book_detail),
    path('books/<int:id>/recommend/',views.recommend_books),
    path('query/', views.query_books),
    path('scrape/', views.run_scraper_api),
]