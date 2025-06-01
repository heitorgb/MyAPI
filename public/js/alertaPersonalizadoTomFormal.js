// alertPersonalizado personalizado

function alertPersonalizado(message,time) {
    let alertPersonalizado = document.getElementById("alertPersonalizado");
    
    if (!alertPersonalizado) {
        alertPersonalizado = document.createElement("div");
        alertPersonalizado.id = "alertPersonalizado";
        alertPersonalizado.style = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #333;
        color: #fff;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s;
      `;
      document.body.appendChild(alertPersonalizado);
    }
  
    alertPersonalizado.textContent = message;
    alertPersonalizado.style.opacity = "1";
  
    setTimeout(() => {
        alertPersonalizado.style.opacity = "0";
        alertPersonalizado.remove(); 
    }, time);
  };