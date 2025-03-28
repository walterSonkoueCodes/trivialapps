<?php

namespace App\DataFixtures;

use App\Entity\Service;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\String\Slugger\SluggerInterface;

class ServiceFixtures extends Fixture
{
    public function __construct(private SluggerInterface $slugger) {}

    public function load(ObjectManager $manager): void
    {
        $services = [
            [
                'name' => 'Website Creation',
                'description' => 'Modern, responsive websites tailored to your business needs.',
                'fullDescription' => 'We design custom websites that reflect your brand and business goals. From landing pages to e-commerce platforms, we ensure speed, SEO, and mobile responsiveness with modern frameworks.',
                'image' => 'images/services/website_creation.jpg',
                'videoUrl' => 'videos/services/website_creation.mp4',
                'icon' => 'globe',
                'price' => '1200.00',
                'category' => 'web',
                'features' => [
                    'Custom UI/UX design',
                    'Responsive on all devices',
                    'SEO optimization',
                    'CMS or static site options'
                ]
            ],
            [
                'name' => 'Mobile App Development',
                'description' => 'Custom iOS and Android applications with great UX.',
                'fullDescription' => 'We develop scalable and high-performance mobile apps for iOS and Android. Whether it’s for startups or enterprise, we handle everything from UI design to store deployment.',
                'image' => 'images/services/mobile_app.jpg',
                'videoUrl' => 'videos/services/mobile_app.mp4',
                'icon' => 'smartphone',
                'price' => '2500.00',
                'category' => 'mobile',
                'features' => [
                    'Cross-platform development',
                    'App Store & Play Store ready',
                    'Fast & secure APIs',
                    'Modern mobile UI design'
                ]
            ],
            [
                'name' => '2D/3D Design',
                'description' => 'Eye-catching 2D and 3D visuals crafted to perfection.',
                'fullDescription' => 'Our designers create stunning 2D illustrations and 3D models for marketing, product design, and more. Delivered in high-resolution formats with attention to detail.',
                'image' => 'images/services/2d_3d_design.jpg',
                'videoUrl' => 'videos/services/2d_3d_design.mp4',
                'icon' => 'cube',
                'price' => '800.00',
                'category' => 'design',
                'features' => [
                    'Vector & raster graphics',
                    '3D modeling & rendering',
                    'Files for print or digital',
                    'Custom styles on request'
                ]
            ],
            [
                'name' => 'Sketching',
                'description' => 'Concept illustrations and hand-drawn sketches.',
                'fullDescription' => 'We provide high-quality sketching services for concept art, characters, vehicles, and product ideas. All sketches are digitally refined and ready for presentation or development.',
                'image' => 'images/services/sketching.jpg',
                'videoUrl' => 'videos/services/sketching.mp4',
                'icon' => 'pencil',
                'price' => '350.00',
                'category' => 'sketching',
                'features' => [
                    'Digital or hand-drawn',
                    'Character & product concepts',
                    'Black & white or color',
                    'Delivered in high-res PNG/PDF'
                ]
            ],
            [
                'name' => 'Video Editing for Content Creators',
                'description' => 'Professional editing for YouTube, TikTok and more.',
                'fullDescription' => 'We help influencers and brands stand out with sharp video editing, effects, subtitles, and transitions. Designed for YouTube, Instagram, TikTok and other platforms.',
                'image' => 'images/services/video_editing.jpg',
                'videoUrl' => 'videos/services/video_editing.mp4',
                'icon' => 'video',
                'price' => '600.00',
                'category' => 'video_editing',
                'features' => [
                    'Trendy transitions & cuts',
                    'Auto-subtitles and captions',
                    'Sound mixing & effects',
                    'Optimized for social media'
                ]
            ],
            [
                'name' => 'Data Science',
                'description' => 'Turn your data into powerful insights.',
                'fullDescription' => 'We offer services in data analysis, machine learning, dashboarding, and visualization to help you unlock your data’s potential.',
                'image' => 'images/services/data_science.jpg',
                'videoUrl' => 'videos/services/data_science.mp4',
                'icon' => 'chart-line',
                'price' => '1500.00',
                'category' => 'data_science',
                'features' => [
                    'Custom data dashboards',
                    'Machine learning models',
                    'Data cleaning & prep',
                    'Predictive analytics'
                ]
            ]
        ];

        foreach ($services as $data) {
            $service = new Service();
            $service->setName($data['name']);
            $service->setDescription($data['description']);
            $service->setFullDescription($data['fullDescription']);
            $service->setPrice($data['price']);
            $service->setCategory($data['category']);
            $service->setImage($data['image']);
            $service->setVideoUrl($data['videoUrl']);
            $service->setIcon($data['icon']);
            $service->setFeatures($data['features']);

            $manager->persist($service);
        }

        $manager->flush();
    }
}
