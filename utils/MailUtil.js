const mailer = require("nodemailer")

const mailSend = async(to,subject,text)=>{

    const transporter = mailer.createTransport({
        service:"gmail",
        auth:{
            user:"pythonforsamir@gmail.com",
            pass:"kbmu octe erag zdkf",
        }
    })
    const mailOptions = {
        from :"pythonforsamir@gmail.com",
        to:to,
        subject:subject,
        text:text
    }

    const mailResponse = await transporter.sendMail(mailOptions)
    console.log(mailResponse)

}
module.exports = mailSend
//mailSend("samir.vithlani83955@gmail.com","test mail","test body")