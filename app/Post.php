<?php

namespace App;

use Hatamiarash7\JDF\Generator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    /**
     * The categories
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_post');
    }

    /**
     * The Tags
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'post_tag');
    }

    /**
     * The Comments
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, 'post_id');
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function (Post $model) {
            $jdf = new Generator();
            $model->create_date = $jdf->getTimestamp();
        });

        static::updating(function (Post $model) {
            $jdf = new Generator();
            $model->update_date = $jdf->getTimestamp();
        });
    }
}
