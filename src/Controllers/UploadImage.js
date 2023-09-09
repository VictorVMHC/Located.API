const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const uploadImage = async (req, res) => {
    try{
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                msg: 'No files were uploaded.'}
            );
        }
    
        if ( !req.files.image ) {
            return res.status(400).json({
                msg: 'No files were uploaded.'}
            );
        }

        const {tempFilePath} = req.files.image;
    
        const response = await cloudinary.uploader.upload( tempFilePath )

        res.status(200).json({
            response
        })

    }catch(err){
        res.json(err)
    }

};

module.exports = {
    uploadImage,
};