<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class InvoiceControllerTest extends WebTestCase{
    public function testIndex(): void
    {
        $client = InvoiceControllerTest::createClient();
        $client->request('GET', '/api/invoice');

        self::assertResponseIsSuccessful();
    }
}
