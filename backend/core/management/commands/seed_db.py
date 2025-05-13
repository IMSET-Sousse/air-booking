from django.core.management.base import BaseCommand
from django.utils import timezone
from .models import User, Property, Room, Booking, RoomBooking, Review, Photo, PropertyType, Amenity, AmenityType



class Command(BaseCommand) :
    help = 'seed database with initial data'

    def handle(self, *args, **options):
        #Deleting all existing data
        user.objects.all().delete()
        AmenityType.objects.all().delete()
        PropertyType.objects.all().delete()
        Room.objects.all().delete()
        Photo.objects.all().delete()
        Property.objects.all().delete()
        Amenity.objects.all().delete()
        Booking.objects.all().delete()
        RoomBooking.objects.all().delete()
        Review.objects.all().delete()


        # Adding new Users
        user1 = User.objects.create_user(username='user1', password='password123', is_host=True)
        user2 = User.objects.create_user(username='user2', password='password456', is_host=True)
        user3 = User.objects.create_user(username='guest1', password='password789', is_host=False)


        # Adding AmenityType
        amenity_type1 = AmenityType.objects.create(name='wi-fi')
        amenity_type2 = AmenityType.objects.create(name='Air Conditioning')
        amenity_type3 = AmenityType.objects.create(name='Pool')
        amenity_type4 = AmenityType.objects.create(name='Gym')


        # Adding PropertyType
        property_type1 = PropertyType.objects.create(name='Villa')
        property_type2 = PropertyType.objects.create(name='Appartement')
        property_type3 = PropertyType.objects.create(name='House')


        # Adding Rooms
        room1 = Room.objects.create(name='Master Bedroom', capacity=2)
        room2 = Room.objects.create(name='Guest Bedroom', capacity=1)
        room3 = Room.objects.create(name='Living Room', capacity=4)
        room4 = Room.objects.create(name='Kitchen', capacity=1)

        # Adding photos
        photo1 = Photo.objects.create(url= 'https://ar.airbnb.com/rooms/1169666094463199825?source_impression_id=p3_1744309968_P34qaobKkGpH4Ljr&modal=PHOTO_TOUR_SCROLLABLE&modalItem=1920573394')
        photo2 = Photo.objects.create(url= 'https://ar.airbnb.com/rooms/53586487?source_impression_id=p3_1744310262_P30kfpc2aRgS58q2&modal=PHOTO_TOUR_SCROLLABLE&modalItem=1296016464')
        photo3 = Photo.objects.create(url= 'https://ar.airbnb.com/rooms/905788230258472927?source_impression_id=p3_1744310328_P3mYjruhtuGG3_Yk&modal=PHOTO_TOUR_SCROLLABLE&modalItem=1666565989')
        photo4 = Photo.objects.create(url= 'https://ar.airbnb.com/rooms/35034339?source_impression_id=p3_1744310393_P3OnZ81I8XMWBwER&modal=PHOTO_TOUR_SCROLLABLE&modalItem=1167681728')


        # Adding Properties
        property1 = Property.objects.create(
            host=user1,
            title='A beautiful villa in the countryside',
            description='A beautiful villa with pool and Wi-Fi',
            price= 400.00,
            location= 'Countryside, Tunisia',
            available_start=timezone.now(),
            available_end=timezone.now() + timezone.timedelta(days=90),
            property_type=property_type1,
        )

        property1.photos.add(photo1)
        property1.rooms.add(room1, room2, room3)


        property2 = Property.objects.create(
            host=user2,
            title='Modern Appartement in the city',
            description='A Modern Appartement with gym and Wi-Fi',
            price= 900.00,
            location= 'City, Tunisia',
            available_start=timezone.now(),
            available_end=timezone.now() + timezone.timedelta(days=60),
            property_type=property_type2,
        )


        property2.photos.add(photo2)
        property2.rooms.add(room1, room4)

        # Adding Amenities to Properties

        amentiy1 = Amenity.objects.create(property=property1,  amenity_type=amenity_type1)
        amentiy2 = Amenity.objects.create(property=property1,  amenity_type=amenity_type2)
        amentiy3 = Amenity.objects.create(property=property1,  amenity_type=amenity_type3)
        amentiy4 = Amenity.objects.create(property=property2,  amenity_type=amenity_type1)
        amentiy5 = Amenity.objects.create(property=property2,  amenity_type=amenity_type4)

        #  Adding Bookings
        booking1= Booking.objects.create(
            guest=user3,
            property=property1,
            check_in_date=timezone.now() + timezone.timedelta(days=7),
            check_out_date=timezone.now() + timezone.timedelta(days=14),

        )


        booking2= Booking.objects.create(
            guest=user3,
            property=property2,
            check_in_date=timezone.now() + timezone.timedelta(days=15),
            check_out_date=timezone.now() + timezone.timedelta(days=22),

        )

        # Adding RoomBookings
        room_booking1 = RoomBooking.objects.create(
            room=room1,
            booking=booking1,
            adults=2,
            children=0,  
        )


        room_booking2 = RoomBooking.objects.create(
            room=room2,
            booking=booking2,
            adults=1,
            children=0,  
        )


        # Adding Reviews
        review1 = Review.objects.create(
            reviewer=user3,
            property=property1,
            review_text='Amazing stay! the villa was beautiful and the host was very accomodating.',
            rating=5,
        )


        review2, = Review.objects.create(
            reviewer=user3,
            property=property2,
            review_text='Great Appartement! very modeern clean.',
            rating=4,
        )



    


         
        


         
