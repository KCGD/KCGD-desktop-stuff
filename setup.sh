wget "https://dl.nwjs.io/v0.60.0/nwjs-sdk-v0.60.0-linux-x64.tar.gz" -O nw.tar.gz
tar -xvf nw.tar.gz -C ./
rm nw.tar.gz
mv ./nwjs-sdk-v0.60.0-linux-x64/* ./
rm -rvf ./nwjs-sdk-v0.60.0-linux-x64/
npm i
echo setup done