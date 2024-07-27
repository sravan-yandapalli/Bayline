import axios from "axios";
import qs from "qs";


// ============================== authentication api ================================

export const loginApi = async (params: any) => {
  let data = qs.stringify({
    // email: "info1@aiqua.co",
    // password: "BossGuy@28",
    email: params.email,
    password: params.password,
  });
  return await axios.post("https://aiqua-node.aiqua.co/auth/signin", data);
};


export const sizeVariationDetectionApi = async (params: any) => {

  console.log(params)
  axios({
    method: "POST",
    maxBodyLength: Infinity,
    url: "https://fastapi-counting.aiqua.co/size_variation_detection",
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    });
};



// ==================================================================================
