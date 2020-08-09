<?php

namespace App;

use Hatamiarash7\JDF\Generator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    public static function boot()
    {
        parent::boot();

        static::creating(function (Post $model) {
            $jdf = new Generator();
            $model->create_date = $jdf->getTimestamp();
        });
    }

    /**
     * The Post
     */
    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class, 'post_id');
    }
}
