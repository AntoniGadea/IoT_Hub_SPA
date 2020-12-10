export { overview, login, lightCard, panelCard, addModal};

let overview = `<div class="container-fluid">
                    <div class="row bg-white p-3">
                        <h2 class=" col-8 pl-5">Dashboard</h2>
                        <div class="col-2 text-right">
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">
                                <span class="pt-2 pr-2">Add</span>
                                <svg id="add" width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-plus-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                </svg>
                            </button>
                        </div>
                        <div class="col-2 text-right pr-5">
                            <a id="logout" class="btn btn-danger" href="#">LogOut</a>
                        </div>
                    </div>
                    <div id="deck" class="m-5">
                        <h2>Lights</h2>
                        <hr>
                        <div id="lights" class="row">
                        </div>
                        <h2 class="mt-5">Solar Panels</h2>
                        <hr>
                        <div id="panels" class="row">
                        </div>
                        <h2 class="mt-5">Speakers</h2>
                        <hr>
                        <div id="speakers" class="row">
                        </div>
                    </div>
                </div>`;


let login = `<div class="container-scroller p-5">
                <div class="container-fluid page-body-wrapper full-page-wrapper">
                <div class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
                    <div class="row w-100">
                    <div class="col-lg-4 mx-auto">
                        <div class="auto-form-wrapper">
                        <form action="#">
                            <div class="form-group">
                            <label class="label">Username</label>
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Username" id="inputUsername">
                                <div class="input-group-append">
                                <span class="input-group-text">
                                    <i class="mdi mdi-check-circle-outline"></i>
                                </span>
                                </div>
                            </div>
                            </div>
                            <div class="form-group">
                            <label class="label">Password</label>
                            <div class="input-group">
                                <input type="password" class="form-control" placeholder="*********" id="inputPassword">
                                <div class="input-group-append">
                                <span class="input-group-text">
                                    <i class="mdi mdi-check-circle-outline"></i>
                                </span>
                                </div>
                            </div>
                            </div>
                            <div class="form-group">
                            <button id="login" class="btn btn-primary submit-btn btn-block">Login</button>
                            </div>
                            <div class="form-group d-flex justify-content-between">
                            <div class="form-check form-check-flat mt-0">
                                <label class="form-check-label">
                                <input type="checkbox" class="form-check-input" checked> Keep me signed in </label>
                            </div>
                            <a href="#" class="text-small forgot-password text-black">Forgot Password</a>
                            </div>
                            <div class="form-group">
                            <div class="text-block text-center my-3">
                            <span class="text-small font-weight-semibold">Not a member ?</span>
                            <a href="register.html" class="text-black text-small">Create new account</a>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                <!-- content-wrapper ends -->
                </div>
                <!-- page-body-wrapper ends -->
            </div>`;
            
function lightCard(){     
    let card = `<div id="C`+this.id+`"><div id="`+this.id+`" class="flip-card my-3 mx-5 card card-light">
                    <div class="flip-card-inner">
                        <div class="flip-card-front card-body">
                            <h5 class="card-title mb-4">`+this.name+`</h5>
                            <p class="card-text">`;

                if(this.status == "off"){
                    card += `<i class="fas fa-lightbulb fa-2x" style="color:#505050"></i>`;
                }else{
                    card += `<i class="fas fa-lightbulb fa-2x" style="color:`+this.color+`"></i>`;
                }

                    card +=`<span class="ml-4">`+this.brand+`</sapan>
                            </p>
                        </div>
                        <div class="flip-card-back card-body">
                            <button type="button" class="close mr-2" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <p class="card-text">
                                <label for="color">Color</label>
                                <input class="colorpicker" name="color" class="m-2" type="color" value="`+this.color+`"><br>`;

                    if(this.rgb == 0){
                        card += `<span>This light is not RGB</span>
                                </p>`;
                    }else{
                        card += `<span>This light is RGB</span>
                                </p>`;
                    }

                if(this.status == "off"){
                    card += `<button data-card="`+this.id+`" class="btn btn-info">Turn on</button>`;
                }else{
                    card += `<button class="btn btn-info">Turn off</button>`;
                }
                card += `</div>
                    </div>
                </div></div>`;

    return card;
};

function panelCard(){
    let card = `<div id="P`+this.id+`">
                    <div id="`+this.id+`" class="my-3 mx-5 card card-panel">
                        <div class="card-body text-center">
                        <h5 class="card-tittle">`+this.name+`</h5>
                        <canvas class="p-3" id="chart-`+this.id+`" width="100%" height="100%"></canvas>
                        </div>
                    </div>
                </div>`;

    return card;
}

let addModal = `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add new device!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="name" class="col-form-label">Name:</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="device-type" class="col-form-label">Type:</label>
                        <select name="device-type">
                            <option value="light">Light</option>
                            <option value="speaker">Speaker</option>
                            <option value="fridge">Fridge</option>
                            <option value="solarpanel">Solarpanel</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="brand" class="col-form-label">Brand:</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="brand" class="col-form-label">Brand:</label>
                        <textarea class="form-control" id="message-text"></textarea>
                    </div>
                </form>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-success">Save</button>
                </div>
            </div>
            </div>
            </div>`;