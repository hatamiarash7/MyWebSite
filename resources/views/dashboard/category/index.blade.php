@extends('dashboard.layout.base')

@section('content')
    <div class="container-fluid mt--7">
        <div class="row">
            <div class="col">
                <div class="card shadow">
                    <div class="card-header bg-transparent">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <h3 class="mb-0">دسته بندی ها</h3>
                            </div>
                            <div class="col-4 text-right">
                                <a href="{{ route('dashboard::category.create') }}" class="btn btn-sm btn-primary">اضافه
                                    کردن</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="cat-list">
                            @if(count($categories) > 0)
                                <div class="table-responsive">
                                    <table class="table align-items-center table-flush">
                                        <thead class="thead-light">
                                        <tr>
                                            <th scope="col">عنوان</th>
                                            <th scope="col">رنگ</th>
                                            <th scope="col">توضیحات</th>
                                            <th scope="col">عملیات</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        @foreach($categories as $category)
                                            <tr>
                                                <th scope="row" class="align-items-center">
                                                    <span class="mb-0 text-sm">{{ $category->title }}</span>
                                                </th>
                                                <td>
                                                    <span class="dot"
                                                          style="background-color: {{ $category->color }}"></span>
                                                </td>
                                                <td>
                                                    <p class="mb-0 text-sm">{{ mb_strimwidth($category->description, 0, 50, '...') }}</p>
                                                </td>
                                                <td>
                                                    <div class="dropdown">
                                                        <a class="btn btn-sm btn-icon-only text-light" href="#"
                                                           role="button" data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i class="fas fa-ellipsis-v"></i>
                                                        </a>
                                                        <div
                                                            class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                                            <a class="dropdown-item" href="{{ route('dashboard::category.delete', $category->id) }}">حذف</a>
                                                            <a class="dropdown-item" href="{{ route('dashboard::category.edit', $category->id) }}">ویرایش</a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        @endforeach
                                        </tbody>
                                    </table>
                                </div>
                            @else
                                <p>هیچ موردی ثبت نشده است</p>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
