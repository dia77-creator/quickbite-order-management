from django.test import TestCase

# Create your tests here.

from rest_framework.test import APITestCase
from django.urls import reverse
from .models import MenuItem


class OrderTests(APITestCase):

    def setUp(self):
        self.menu_item = MenuItem.objects.create(
            name="Pizza",
            description="Cheese Pizza",
            price=10.00
        )

    def test_create_order(self):
        url = "/api/orders/"
        data = {
            "customer_name": "Diya",
            "address": "Mumbai",
            "phone": "9876543210",
            "items": [
                {
                    "menu_item": self.menu_item.id,
                    "quantity": 2
                }
            ]
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, 201)

    def test_invalid_phone(self):
        url = "/api/orders/"
        data = {
            "customer_name": "Diya",
            "address": "Mumbai",
            "phone": "abc",
            "items": [
                {
                    "menu_item": self.menu_item.id,
                    "quantity": 1
                }
            ]
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, 400)
