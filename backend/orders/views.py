from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import MenuItem, Order
from .serializers import MenuItemSerializer, OrderSerializer
import threading
import time


class MenuItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuItem.objects.filter(is_available=True)
    serializer_class = MenuItemSerializer
    permission_classes = [AllowAny]


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        order = serializer.save()

        # Start background thread
        threading.Thread(
            target=update_order_status,
            args=(order,),
            daemon=True
        ).start()


def update_order_status(order):
    time.sleep(10)
    order.status = "PREPARING"
    order.save()

    time.sleep(10)
    order.status = "OUT_FOR_DELIVERY"
    order.save()

    time.sleep(10)
    order.status = "DELIVERED"
    order.save()
