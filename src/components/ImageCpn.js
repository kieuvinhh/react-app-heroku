import "./Image.css";
import React, { useState } from "react";
import MagicDropZone from "react-magic-dropzone";
import axios from "axios";

export default function ImageCpn() {
  const [result, setResult] = useState("kết quả");
  const [Url, setUrl] = useState("");
  const [resultStyle, setResultStyle] = useState("alert alert-primary")
  const [image, setImage] = useState(null);

  function onDrop(accepted, rejected, links) {
    setImage(accepted[0].preview || links[0]);
  }
  function getBase64Image(img) {
    // https://stackoverflow.com/questions/22172604/convert-image-url-to-base64
    var canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    console.log("Kich thuoc canvas", canvas.width, canvas.height);
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
  
  
  function onImageLoaded(e){
    const img = e.target;
    var base64 = getBase64Image(img);
    var bodyFormData = new FormData();
    bodyFormData.append('img', base64);
  
axios({
      method: "post",
      url: Url,
      data: bodyFormData
    })
      .then(function (response) {
        const res_age = response['data'].age;
        const res_cl = response['data'].cl_age; 
        // console.log(res_age);
        const resultss = 'Độ tuổi: ' + res_age + ' Nhóm: ' + res_cl;
        setResult(resultss);
        setResultStyle("alert alert-primary") // Chuyen khung result sang mau xanh
      })
      .catch(function (error){
        console.log(error);
        console.log("Cannot detect face")
        setResult("Sorry! Can not find any face in this image")
        setResultStyle("alert alert-danger") // Chuyen khung result sang mau do
      })
  }

 
  return (
    <div className='App_image'>
    <input id='input-url' type="text" name="name" autoComplete='off'/>
    <button onClick={ () => {setUrl(document.getElementById('input-url').value)}}>update Url</button>
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