@extends('dashboard.layout.base')

@section('content')
    <div class="container-fluid mt--7">
        <!-- Table -->
        <div class="row">
            <div class="col">
                <div class="card shadow">
                    <div class="card-header bg-transparent">
                        <h3 class="mb-0">الأيقونات</h3>
                    </div>
                    <div class="card-body">
                        <div class="row icon-examples">
                            <div class="col-lg-3 col-md-6">
                                <button type="button" class="btn-icon-clipboard" data-clipboard-text="active-40"
                                        title="Copy to clipboard">
                                    <div>
                                        <i class="ni ni-active-40"></i>
                                        <span>active-40</span>
                                    </div>
                                </button>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <button type="button" class="btn-icon-clipboard" data-clipboard-text="air-baloon"
                                        title="Copy to clipboard">
                                    <div>
                                        <i class="ni ni-air-baloon"></i>
                                        <span>air-baloon</span>
                                    </div>
                                </button>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <button type="button" class="btn-icon-clipboard" data-clipboard-text="album-2"
                                        title="Copy to clipboard">
                                    <div>
                                        <i class="ni ni-album-2"></i>
                                        <span>album-2</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
