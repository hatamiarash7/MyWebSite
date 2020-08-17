<?php

namespace App\Http\Controllers\Dashboard;

use App\Category;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = (new Category())->orderBy('title')->get();

        return view('dashboard.category.index', compact('categories'));
    }

    public function create()
    {
        return view('dashboard.category.create');
    }

    public function save(Request $request)
    {
        $validatedData = $request->validate([
            'title' => ['required', 'string'],
            'description' => ['string'],
            'color' => [
                'required',
                'string',
                'regex:/^(\#[\da-f]{3}|\#[\da-f]{6}|rgba\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2}((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)(,\s*(0\.\d+|1))\)|hsla\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)(,\s*(0\.\d+|1))\)|rgb\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2}((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)|hsl\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)\))$/'
            ]
        ]);

        Category::create($validatedData);

        $message = "دسته بندی " . $validatedData['title'] . " ایجاد شد";
        return redirect()->route('dashboard::category.index')->with('message', $message);
    }

    public function edit($categoryId)
    {
        $category = (new Category())->whereId($categoryId)->firstOrFail();

        return view('dashboard.category.edit', compact('category'));
    }

    public function update(Request $request, $categoryId)
    {
        $validatedData = $request->validate([
            'title' => ['required', 'string'],
            'description' => ['string'],
            'color' => [
                'required',
                'string',
                'regex:/^(\#[\da-f]{3}|\#[\da-f]{6}|rgba\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2}((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)(,\s*(0\.\d+|1))\)|hsla\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)(,\s*(0\.\d+|1))\)|rgb\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2}((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)|hsl\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)\))$/'
            ]
        ]);

        Category::findOrFail($categoryId)->update($validatedData);

        $message = "دسته بندی " . $validatedData['title'] . " آپدیت شد";
        return redirect()->route('dashboard::category.index')->with('message', $message);
    }

    public function delete($categoryId)
    {
        try {
            $category = Category::findOrFail($categoryId)->first();
            $message = "دسته بندی " . $category->title . " حذف شد";
            $category->delete();

            return redirect()->route('dashboard::category.index')->with('message', $message);
        } catch (Exception $exception) {
            $message = "خطایی رخ داده است";
            return redirect()->route('dashboard::category.index')->with('message', $message);
        }
    }
}
