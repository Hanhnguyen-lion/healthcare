<template>
    <div class="image">
        <div class="container-fluid">
            <div class="d-flex align-items-center justify-content-center vh-100">
                <div class="col-md-6 col-lg-4">
                    <div class="card">
                        <h3 class="card-header">Login</h3>
                        <div class="card-body">
                            <form>
                                <div class="form-group mb-3">
                                    <label>Email <span class="text-danger">*</span></label>
                                    <input type="text" formControlName="email" class="form-control" placeholder="Enter your email" />
                                </div>
                                <div class="form-group mb-3">
                                    <label>Password <span class="text-danger">*</span></label>
                                    <input type="password" formControlName="password" class="form-control" placeholder="Enter password" />
                                </div>
                                <div class="form-group mb-3">
                                    <div class="form-group col d-md-flex">
                                        <a routerLink="/Account/Forgotpassword" class="btn btn-link fw-bold text-black">Forgot Password?</a>
                                    </div>
                                </div>
                                <div class="form-group mb-3">
                                    <div class="form-group col d-grid gap-2 d-md-flex">
                                        <button class="btn btn-primary">
                                            Login
                                        </button>
                                    </div>
                                </div>
                                <div class="form-group mb-3">
                                    <a routerLink="/Account/Register" class="btn btn-secondary">Don't have an account? Register</a>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<routerLink></routerLink>
</template>
<script>
export default{
    name: 'LoginComponent'
}
</script>
