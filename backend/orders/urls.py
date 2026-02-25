from rest_framework.routers import DefaultRouter
from .views import MenuItemViewSet, OrderViewSet

router = DefaultRouter()
router.register("menu", MenuItemViewSet, basename="menu")
router.register("orders", OrderViewSet, basename="orders")

urlpatterns = router.urls