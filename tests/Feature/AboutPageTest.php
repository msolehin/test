<?php

namespace Tests\Feature;

use Tests\TestCase;

class AboutPageTest extends TestCase
{
    public function test_about_page_renders(): void
    {
        $this->get('/about')->assertOk()->assertSee('About')->assertSee(url('/'), false);
    }

    public function test_about_route_is_named(): void
    {
        $this->assertSame(url('/about'), route('about'));
    }

    public function test_homepage_links_to_about_page(): void
    {
        $this->get('/')->assertOk()->assertSee('href="'.route('about').'"', false)->assertSee('About');
    }
}
