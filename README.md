# ai-starter

these steps worked for me 

step 1:
!wget -q https://raw.githubusercontent.com/buildspace/diffusers/main/examples/dreambooth/train_dreambooth.py
!wget -q https://github.com/ShivamShrirao/diffusers/raw/main/scripts/convert_diffusers_to_original_stable_diffusion.py
%pip install -qq git+https://github.com/ShivamShrirao/diffusers
%pip install -q -U --pre triton
%pip install -q accelerate==0.15.0 transformers ftfy bitsandbytes==0.35.0 gradio natsort
%pip uninstall torch torchvision -y
%pip install torch torchvision

step3:
%pip install --no-deps https://github.com/brian6091/xformers-wheels/releases/download/0.0.15.dev0%2B4c06c79/xformers-0.0.15.dev0+4c06 c79.d20221205-cp38-cp38-linux_x86_64.whl

step 7:
--resolution=350 \
--sample_batch_size=1 \
--max_train_steps=700 \

step 8:
add %pip install safetensors
