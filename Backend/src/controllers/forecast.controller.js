import sharp from 'sharp';


const forecastController = {
    prepare_input: async (req, res) => {
         // Thư mục lưu trữ file tạm thời
        // console.log(req.body.chunk);
        // const img = sharp(buf);
        // const md = await img.metadata();
        // const [img_width,img_height] = [md.width, md.height];
        // const pixels = await img.removeAlpha()
        //     .resize({width:640,height:640,fit:'fill'})
        //     .raw()
        //     .toBuffer();

        // const red = [], green = [], blue = []; forecast
        // for (let index=0; index<pixels.length; index+=3) {
        //     red.push(pixels[index]/255.0);
        //     green.push(pixels[index+1]/255.0);
        //     blue.push(pixels[index+2]/255.0);
        // }

        // const input = [...red, ...green, ...blue];
        // return [input, img_width, img_height];
    }
};

export default forecastController;