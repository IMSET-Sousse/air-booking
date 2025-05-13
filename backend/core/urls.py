from . import views
from django.urls import path

urlpatterns = [
    path('properties/', views.PropertyListCreateView.as_view()),
    path('properties/<int:pk>/', views.PropertyDetailView.as_view()),
    path('bookings/', views.BookingListCreateView.as_view()),
    path('bookings/<int:pk>/', views.BookingDetailView.as_view()),
]
