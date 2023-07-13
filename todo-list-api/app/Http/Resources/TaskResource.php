<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        //determin what coloumns returned
        return  [
            'id' => $this->id,
            'title' => $this->title,
            'decsription' => $this->description,
            'deleted_at' => $this->deleted_at
        ];
    }
}
