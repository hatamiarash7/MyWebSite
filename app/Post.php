<?php

namespace App;

use Eloquent;
use Hatamiarash7\JDF\Generator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * App\Post
 *
 * @property int $id
 * @property string $title
 * @property string $description
 * @property string $header
 * @property string $slug
 * @property string $body
 * @property int $draft
 * @property int $read_time
 * @property string $create_date
 * @property string|null $update_date
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection|Category[] $categories
 * @property-read int|null $categories_count
 * @property-read Collection|Comment[] $comments
 * @property-read int|null $comments_count
 * @property-read Collection|Tag[] $tags
 * @property-read int|null $tags_count
 * @method static Builder|Post newModelQuery()
 * @method static Builder|Post newQuery()
 * @method static Builder|Post query()
 * @method static Builder|Post whereBody($value)
 * @method static Builder|Post whereCreateDate($value)
 * @method static Builder|Post whereCreatedAt($value)
 * @method static Builder|Post whereDescription($value)
 * @method static Builder|Post whereDraft($value)
 * @method static Builder|Post whereHeader($value)
 * @method static Builder|Post whereId($value)
 * @method static Builder|Post whereReadTime($value)
 * @method static Builder|Post whereSlug($value)
 * @method static Builder|Post whereTitle($value)
 * @method static Builder|Post whereUpdateDate($value)
 * @method static Builder|Post whereUpdatedAt($value)
 * @mixin Eloquent
 */
class Post extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'description', 'header', 'slug', 'body', 'draft'
    ];

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
