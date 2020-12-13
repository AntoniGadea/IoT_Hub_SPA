export { overview, login, lightCard, panelCard, speakerCard, addModal, loading, adminPanel};

let loading = `<div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>`;

let overview = `<div class="container-fluid">
                    <div class="row bg-white p-3">
                        <h2 class="col-8 pl-5">Dashboard</h2>
                        <div class="col-2">
                            <button  type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">
                                <span class="pt-2 pr-2">Add</span>
                                <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-plus-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                </svg>
                            </button>
                        </div>
                        <div class="col-2 pr-5">
                            <a id="logout" class="btn btn-danger" href="#">LogOut</a>
                        </div>
                    </div>
                    <div id="deck" class="m-5">
                        <h3>Lights</h3>
                        <hr>
                        <div id="lights" class="row d-flex justify-content-center">
                        </div>
                        <h3 class="mt-5">Solar Panels</h3>
                        <hr>
                        <div id="panels" class="row d-flex justify-content-center">
                        </div>
                        <h3 class="mt-5">Speakers</h3>
                        <hr>
                        <div id="speakers" class="row d-flex justify-content-center">
                        </div>
                    </div>
                </div>`;

let adminPanel = `<div class="container-fluid">
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
                       
                    </div>
                    </div>
                    </div>`;


let login = `<div class="container-scroller p-5">
                <div class="container-fluid page-body-wrapper full-page-wrapper">
                <div class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
                    <div class="row w-100">
                    <div class="col-lg-4 mx-auto">
                        <div class="auto-form-wrapper">
                        <form onsubmit="false">
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
    let card = `<div id="C`+this.id+`"><div id="`+this.id+`" class="flip-card m-4 card card-light">
                    <div class="flip-card-inner">
                        <div class="flip-card-front card-body">
                            <h5 class="card-title mb-4">`+this.name+`</h5>
                            <p class="card-text">`;

                if(this.status == "off"){
                    card += `<i class="fas fa-lightbulb fa-2x" style="color:#505050"></i>
                            <span class="ml-4">`;
                }else{
                    card += `<i class="fas fa-lightbulb fa-2x" style="color:`+this.color+`"></i>
                            <span class="ml-4">`;
                }

                switch(this.brand){
                    case("Xiaomi"): card += `<img class="logo" src="../img/xiaomi.png"></span>`;
                                    break;
                    case("Philips"): card += `<img class="logo" src="../img/philips.png"></span>`;
                                    break;
                    case("TP-Link"): card += `<img class="logo" src="../img/tplink.png"></span>`;
                                    break;
                    default : card += this.brand+`</span>`;
                                    break;
                }
                    card +=` </p>
                        </div>
                        <div class="flip-card-back card-body text-center">
                            <button type="button" class="close mr-3" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                                <label for="color">Color</label>
                                <div class="colorpicker-container">
                                    <input class="colorpicker" name="color" type="color" value="`+this.color+`"><br>
                                </div>
                                <br>`;

                    if(this.rgb == 0){
                        card += `<span class="text-right">This light is not RGB</span>
                                <br>`;
                    }else{
                        card += `<span>This light is RGB</span>
                                <br>`;
                    }

                if(this.status == "off"){
                    card += `<button data-card="`+this.id+`" class="btn btn-info m-2">Turn on</button>`;
                }else{
                    card += `<button id="add" class="btn btn-info m-2">Turn off</button>`;
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

function speakerCard(){
    let card = `<div id="S`+this.id+`">
                    <div id="`+this.id+`" class="my-3 mx-5 card card-speacker">
                        <div class="card-body text-center">
                        <h5 class="card-tittle mb-3">`+this.name+`</h5>
                        <span class="text-left mr-3">
                            <i class="fas fa-volume-up mr-1"></i>`+this.volume+`
                        </span>`;
                
                switch(this.brand){
                    case("google"): card += `<img class="logo text-center" src="../img/google.png">`;
                                    break;
                    case("alexa"): card += `<img class="logo" src="../img/alexa.png">`;
                                    break;
                    case("apple"): card += `<img class="logo" src="../img/apple.png">`;
                                    break;
                }        
                        
                card += `<span class="text-right ml-4">`+this.status+`</span>
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
                <form onsubmit="false">
                    <div class="form-group">
                        <label for="name" class="col-form-label">Name:</label>
                        <input type="text" name="name" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="brand" class="col-form-label">Brand:</label>
                        <select  name="brand">
                            <option value="-" selected>--</option>
                            <option value="Xiaomi">Xiaomi</option>
                            <option value="Philips">Philips</option>
                            <option value="LG">LG</option>
                            <option value="TP-Link">TP-Link</option>
                            <option value="Samsungk">Samsung</option>
                            <option value="Google">Google</option>
                            <option value="Apple">Apple</option>
                            <option value="Alexa">Alexa</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="type" class="col-form-label">Type:</label>
                        <select id="modal-input" name="type">
                            <option value="-" selected>--</option>
                            <option value="light">Light</option>
                            <option value="speaker">Speaker</option>
                            <option value="fridge" disabled>Fridge</option>
                            <option value="solarpanel">Solarpanel</option>
                        </select>
                    </div>
                    <div id="insertModal">
                    </div>
                </form>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button id="add" type="button" class="btn btn-success">Save</button>
                </div>
            </div>
            </div>
            </div>`;
