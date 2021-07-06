import "./Image.css";
import React, { useState } from "react";
import MagicDropZone from "react-magic-dropzone";
import axios from "axios";

export default function ImageCpn() {
  const [result, setResult] = useState("kết quả");
  const [resultStyle, setResultStyle] = useState("alert alert-primary")
  const [image, setImage] = useState(null);

  function onDrop(accepted, rejected, links) {
    setImage(accepted[0].preview || links[0]);
  }
  function getBase64Image(img) {
    // https://stackoverflow.com/questions/22172604/convert-image-url-to-base64
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
  
  
  function onImageLoaded(e){
    var base64 = getBase64Image(e.target);
    const url = 'http://98a1a82744c0.ngrok.io/image' // post to this url
    var bodyFormData = new FormData();
    bodyFormData.append('img', base64);
  
axios({
      method: "post",
      url: url,
      data: bodyFormData
    })
      .then(function (response) {
        const res_age = response['data'].age; 
        // console.log(res_age);
        const resultss = 'Độ tuổi của người trong ảnh là: ' + res_age;
        setResult(resultss);
        setResultStyle("alert alert-primary") // Chuyen khung result sang mau xanh
      })
      .catch(function (error){
        console.log(error);
        console.log("Cannot detect face")
        setResult("Sorry! We can't find any face in this image")
        setResultStyle("alert alert-danger") // Chuyen khung result sang mau do
      })
  }

 
  return (
    <div className='App_image'>
      <MagicDropZone
        accept="image/jpeg, image/png, .jpg, .jpeg, .png"
        onDrop={onDrop} 
        multiple={false}
        className="App__image"
      >
        <img
          alt=""
          src={image}
          onLoad={onImageLoaded}
          className="Image_place"
        />
      </MagicDropZone>

      <div className={resultStyle} > {result}</div>
     
    </div>
  );
}