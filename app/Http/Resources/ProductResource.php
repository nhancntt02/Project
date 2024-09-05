<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'product_id' => $this->product_id,
            'product_name' => $this->product_name,
            'product_description' => $this->product_description,
            'product_price' => $this->product_price,
            'product_quantity' => $this->product_quantity,
            'product_status' => $this->product_status,
            'brand_id' => $this->brand_id,
            'cpu_id' => $this->cpu_id,
            'ram_id' => $this->ram_id,
            'rom_id' => $this->rom_id,
            'os_id' => $this->os_id,
            'screen_id' => $this->screen_id,
            'pin_id' => $this->pin_id,
            'cam_id' => $this->cam_id,
        ];
    }
}
