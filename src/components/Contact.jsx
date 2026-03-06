import "/src/CSS/contact.css";
function Contact(){
    return(
        <>
        <section id="body">
        <div id="top"></div>
            <a id="insta"><i class="bi bi-instagram fs-3 text-danger"></i></a><br />
            <a id="twitter" ><i class="bi bi-twitter-x fs-3"></i></a><br />
            <a id="linkedIn" ><i class="bi bi-linkedin fs-3 text-primary"></i></a><br />
            <a id="facebook" ><i className="bi bi-facebook fs-3 text-secondary"></i></a>
       
       <div id="contact">
        <h3>Fill the details</h3>
        <div class="mb-3">
        <label class="form-label">Enter the Name:</label>
        <input class="form-control" type="text" placeholder="name"/>
        </div>
        <br /><br />
        <div class="mb-3">
        <label class="form-label">Enter the Email:</label>
        <input  class="form-control" type="email" placeholder="email" />
        </div>
        <br /><br />
        <div class="mb-3">
        <label class="form-label">Type the Query below:</label>
        <textarea class="form-control"></textarea>
        </div>
        <br /><br />
        <button class="btn btn-primary">Submit</button>
       </div>
    <button className="btn btn-primary" id="homebutton">Home</button>
    </section>
        </>
    )

}
export default Contact;