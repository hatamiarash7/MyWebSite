<?php

namespace App;

use Eloquent;
use Hatamiarash7\JDF\Generator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * App\Comment
 *
 * @property int $id
 * @property int $post_id
 * @property string $name
 * @property string $email
 * @property string $body
 * @property int $confirmed
 * @property string $create_date
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Post $post
 * @method static Builder|Comment newModelQuery()
 * @method static Builder|Comment newQuery()
 * @method static Builder|Comment query()
 * @method static Builder|Comment whereBody($value)
 * @method static Builder|Comment whereConfirmed($value)
 * @method static Builder|Comment whereCreateDate($value)
 * @method static Builder|Comment whereCreatedAt($value)
 * @method static Builder|Comment whereEmail($value)
 * @method static Builder|Comment whereId($value)
 * @method static Builder|Comment whereName($value)
 * @method static Builder|Comment wherePostId($value)
 * @method static Builder|Comment whereUpdatedAt($value)
 * @mixin Eloquent
 */
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
