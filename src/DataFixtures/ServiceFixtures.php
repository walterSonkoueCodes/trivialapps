<?php

namespace App\DataFixtures;

use App\Entity\Service;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ServiceFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $servicesData = [
            // Web Development
            [
                'name' => 'Showcase Website',
                'category' => 'web',
                'price' => 800,
                'description' => 'Professional showcase website to present your business',
                'fullDescription' => 'A modern, fast and responsive showcase website, perfect for highlighting your services or company',
                'features' => [
                    ['name' => 'Custom design', 'price' => 200, 'description' => 'Unique design matching your brand', 'icon' => 'palette'],
                    ['name' => 'Responsive integration', 'price' => 150, 'description' => 'Mobile/tablet compatible', 'icon' => 'devices'],
                    ['name' => 'Advanced contact form', 'price' => 100, 'description' => 'Optimized lead collection', 'icon' => 'email'],
                    ['name' => 'Basic SEO', 'price' => 120, 'description' => 'Better Google ranking', 'icon' => 'search'],
                    ['name' => 'Multilingual translation', 'price' => 200, 'description' => 'Multilingual version of the site', 'icon' => 'translate'],
                ]
            ],
            [
                'name' => 'E-commerce Website',
                'category' => 'web',
                'price' => 1500,
                'description' => 'Complete e-commerce solution for your online store',
                'fullDescription' => 'E-commerce platform with secure payment, inventory management and customer area',
                'features' => [
                    ['name' => 'Cart and payment management', 'price' => 250, 'description' => 'Integrated Stripe/PayPal payment', 'icon' => 'shopping_cart'],
                    ['name' => 'Customer area / dashboard', 'price' => 200, 'description' => 'Order tracking and customer info', 'icon' => 'person'],
                    ['name' => 'Social media login', 'price' => 100, 'description' => 'Google / Facebook login', 'icon' => 'login'],
                    ['name' => 'Advanced shipping / VAT module', 'price' => 150, 'description' => 'Adjustable VAT and shipping', 'icon' => 'local_shipping'],
                    ['name' => 'Inventory management / promo codes', 'price' => 120, 'description' => 'Marketing and inventory', 'icon' => 'inventory'],
                ]
            ],
            [
                'name' => 'Complex Web Application',
                'category' => 'web',
                'price' => 2500,
                'description' => 'Custom web solution for complex projects',
                'fullDescription' => 'Business web application development with database and API',
                'features' => [
                    ['name' => 'Secure authentication with roles', 'price' => 200, 'description' => 'User/admin management', 'icon' => 'lock'],
                    ['name' => 'Custom database', 'price' => 300, 'description' => 'Optimized data model', 'icon' => 'storage'],
                    ['name' => 'REST or GraphQL API', 'price' => 250, 'description' => 'Connect to your apps', 'icon' => 'api'],
                    ['name' => 'Real-time notifications', 'price' => 150, 'description' => 'Instant alerts', 'icon' => 'notifications'],
                    ['name' => 'Interactive dashboard', 'price' => 250, 'description' => 'Dynamic visualization', 'icon' => 'dashboard'],
                ]
            ],

            // Mobile Apps
            [
                'name' => 'Mobile Apps',
                'category' => 'mobile',
                'price' => 1800,
                'description' => 'Native or hybrid mobile applications',
                'fullDescription' => 'iOS and Android app development for your projects',
                'features' => [
                    ['name' => 'Android + iOS deployment', 'price' => 250, 'description' => 'On Apple & Google stores', 'icon' => 'mobile_friendly'],
                    ['name' => 'Push notifications', 'price' => 150, 'description' => 'User engagement', 'icon' => 'push_pin'],
                    ['name' => 'Social authentication', 'price' => 100, 'description' => 'Google/Facebook login', 'icon' => 'account_circle'],
                    ['name' => 'Integrated chat', 'price' => 200, 'description' => 'Support or internal messaging', 'icon' => 'chat'],
                    ['name' => 'Third-party API integration', 'price' => 150, 'description' => 'Connection with CRM or ERP', 'icon' => 'link'],
                ]
            ],

            // UX/UI Design
            [
                'name' => 'UX/UI Design',
                'category' => 'ux_ui_design',
                'price' => 600,
                'description' => 'Optimized user interface design',
                'fullDescription' => 'Creation of intuitive and aesthetic interfaces for your applications',
                'features' => [
                    ['name' => 'Interactive wireframes', 'price' => 150, 'description' => 'Clickable mockups', 'icon' => 'design_services'],
                    ['name' => 'Custom design system', 'price' => 200, 'description' => 'Visual consistency', 'icon' => 'style'],
                    ['name' => 'User testing and feedback', 'price' => 120, 'description' => 'UX optimization', 'icon' => 'feedback'],
                    ['name' => 'Animated prototypes', 'price' => 100, 'description' => 'Interaction simulation', 'icon' => 'animation'],
                    ['name' => 'Mobile version included', 'price' => 100, 'description' => 'Mobile adaptation', 'icon' => 'phone_iphone'],
                ]
            ],

            // Data Science
            [
                'name' => 'Data Science',
                'category' => 'data_science',
                'price' => 1000,
                'description' => 'Data analysis and visualization',
                'fullDescription' => 'Data science solutions to leverage your business data',
                'features' => [
                    ['name' => 'Visualization dashboard', 'price' => 250, 'description' => 'Interactive dashboards', 'icon' => 'insights'],
                    ['name' => 'Data cleaning', 'price' => 150, 'description' => 'Data preparation', 'icon' => 'cleaning_services'],
                    ['name' => 'ML predictive model', 'price' => 300, 'description' => 'Machine learning', 'icon' => 'model_training'],
                    ['name' => 'Automated PDF/Excel export', 'price' => 100, 'description' => 'Automated reports', 'icon' => 'file_download'],
                    ['name' => 'Monthly performance report', 'price' => 200, 'description' => 'KPI tracking', 'icon' => 'assessment'],
                ]
            ],

            // Video Editing
            [
                'name' => 'Professional video editing',
                'category' => 'video_editing',
                'price' => 400,
                'description' => 'Professional video editing',
                'fullDescription' => 'Video editing service with effects and transitions',
                'features' => [
                    ['name' => 'Transitions and royalty-free music', 'price' => 80, 'description' => 'Professional effects', 'icon' => 'music_note'],
                    ['name' => 'Subtitles addition', 'price' => 100, 'description' => 'Improved accessibility', 'icon' => 'subtitles'],
                    ['name' => 'Audio enhancement', 'price' => 80, 'description' => 'Optimized sound quality', 'icon' => 'graphic_eq'],
                    ['name' => 'Dynamic effects', 'price' => 100, 'description' => 'Visual animations', 'icon' => 'auto_awesome'],
                ]
            ],
            [
                'name' => 'Content Creators',
                'category' => 'video_editing',
                'price' => 400,
                'description' => 'Editing for social media',
                'fullDescription' => 'Specialized services for YouTube, TikTok, Instagram',
                'features' => [
                    ['name' => 'Short format editing', 'price' => 120, 'description' => 'Optimized for social media', 'icon' => 'video_library'],
                    ['name' => 'Custom thumbnail', 'price' => 50, 'description' => 'Attractive thumbnail', 'icon' => 'image'],
                    ['name' => 'Intro/outro animation', 'price' => 100, 'description' => 'Visual signature', 'icon' => 'slideshow'],
                    ['name' => 'Social media templates', 'price' => 80, 'description' => 'Reusable templates', 'icon' => 'collections'],
                ]
            ],

            // Sketching
            [
                'name' => 'Logos & Branding',
                'category' => 'sketching',
                'price' => 300,
                'description' => 'Complete visual identity',
                'fullDescription' => 'Logo and graphic charter creation for your brand',
                'features' => [
                    ['name' => 'HD vector logo', 'price' => 100, 'description' => 'Scalable format', 'icon' => 'brush'],
                    ['name' => 'Color variations', 'price' => 80, 'description' => 'Colorimetric variants', 'icon' => 'color_lens'],
                    ['name' => 'PDF style guide', 'price' => 150, 'description' => 'Complete style guide', 'icon' => 'picture_as_pdf'],
                ]
            ],
            [
                'name' => 'Banners & Social Media',
                'category' => 'sketching',
                'price' => 300,
                'description' => 'Visuals for social networks',
                'fullDescription' => 'Creation of visuals adapted to your social platforms',
                'features' => [
                    ['name' => 'Facebook/LinkedIn banner', 'price' => 80, 'description' => 'Professional header', 'icon' => 'crop'],
                    ['name' => 'Social media visuals pack', 'price' => 120, 'description' => 'Regular content', 'icon' => 'grid_on'],
                    ['name' => 'Event covers', 'price' => 70, 'description' => 'Special promotions', 'icon' => 'event'],
                ]
            ],
        ];

        foreach ($servicesData as $data) {
            $service = new Service();
            $service->setName($data['name'])
                ->setCategory($data['category'])
                ->setPrice($data['price'])
                ->setDescription($data['description'])
                ->setFullDescription($data['fullDescription'])
                ->setFeatures(array_column($data['features'], 'name'))
                ->setFeatureDetails($data['features'])
                ->setImage('/images/services/'.strtolower(str_replace(' ', '_', $data['name'])).'.webp')
                ->setIcon('layers')
                ->setVideoUrl('/videos/services/'.strtolower(str_replace(' ', '_', $data['name'])).'.mp4');

            $manager->persist($service);
        }

        $manager->flush();
    }
}