<template>
    <div class="container">
        <div class="row">
            <div class="col-5">
                <label for="file">
                    <div class="file-upload-design">
                        <span class="browse-button">Browse file</span>
                    </div>
                    <input id="file" type="file" @change="handleFileChange" />
                </label>
            </div>
        </div>
        <div class="row">
            <div class="col-5">
                <div class="show__file">
                    <img id="uploaded-image" src="" alt="Uploaded Image">
                </div>
            </div>
            <div class="col-2">
                <div class="bnt__iden">
                    <button class="button" @click="postimage">
                        Iden
                    </button>
                </div>
            </div>
            <div class="col-5">
                <div class="show__file">
                    <!-- <img id="uploaded-image" src="" alt="Uploaded Image"> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            uploadedImageUrl: ''
        };
    },
    methods: {
        handleFileChange(event) {
            const imgElement = document.getElementById('uploaded-image');
            const file = event.target.files[0];
            if (file) {

                imgElement.src = URL.createObjectURL(file)
            }
        },
        async postimage() {
            const fileInput = document.getElementById('file');
            const file = await fileInput.files[0];

            const reader = new FileReader();
            reader.onload = async () => {
                const base64String = reader.result.split(',')[1];
                console.log(base64String);
                try {
                    const chunkSize = 10000; // Độ dài của mỗi phần nhỏ
                    const totalChunks = Math.ceil(base64String.length / chunkSize);
                    for (let i = 0; i < totalChunks; i++) {
                        const start = i * chunkSize;
                        const end = (i + 1) * chunkSize;
                        const chunk = base64String.substring(start, end);
                        const response = await axios.post('http://localhost:3000/api/forecast/upload', { chunk });
                        console.log(response.data);
                    }
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }

            reader.readAsDataURL(file);
        }
    }
};
</script>

<style scope="">
.bnt__iden {
    padding-top: 150px;
}

button {
    max-width: 320px;
    display: flex;
    padding: 0.5rem 1.4rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    vertical-align: middle;
    align-items: center;
    border-radius: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.25);
    gap: 0.75rem;
    color: rgb(65, 63, 63);
    background-color: #fff;
    cursor: pointer;
    transition: all .6s ease;
}

.button svg {
    height: 24px;
}

button:hover {
    transform: scale(1.02);
}

.show__file {
    /* padding: 10px; */
    text-align: center;
    height: 350px;
    width: 350px;
    /* border-radius: 25px; */
    border: 3px solid #353535;
}

.file-upload-form {

    padding: 50px;
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
}

.file-upload-label input {
    display: none;
}

.file-upload-label svg {
    height: 50px;
    fill: rgb(82, 82, 82);
    margin-bottom: 20px;
}

.file-upload-label {
    cursor: pointer;
    background-color: #ddd;
    padding: 30px 70px;
    border-radius: 40px;
    border: 2px dashed rgb(82, 82, 82);
    box-shadow: 0px 0px 200px -50px rgba(0, 0, 0, 0.719);
}

.file-upload-design {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.browse-button {
    background-color: rgb(82, 82, 82);
    padding: 5px 15px;
    border-radius: 10px;
    color: white;
    transition: all 0.3s;
}

.browse-button:hover {
    background-color: rgb(14, 14, 14);
}
</style>