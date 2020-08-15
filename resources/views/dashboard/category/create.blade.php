@extends('dashboard.layout.base')

@section('content')
    <div class="container-fluid mt--7">
        <div class="row">
            <div class="col">
                <div class="card shadow">
                    <div class="card-header bg-transparent">
                        <h3 class="mb-0">دسته بندی جدید</h3>
                    </div>
                    <form method="post" action="{{ route('dashboard::category.save') }}">
                        @csrf
                        <div class="card-body">
                            <div class="pl-lg-4">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label class="form-control-label" for="title">عنوان</label>
                                            <input class="form-control form-control-alternative" id="title" name="title"
                                                   tabindex="1" type="text">
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label class="form-control-label" for="color">رنگ</label>
                                            <input class="form-control form-control-alternative" id="color" name="color"
                                                   tabindex="2" type="color" value="#ffffff">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label class="form-control-label" for="description">توضیحات</label>
                                            <textarea class="form-control form-control-alternative" id="description"
                                                      name="description" rows="2" tabindex="3"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="text-center">
                                <button type="submit" class="btn btn-success">ذخیره</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
