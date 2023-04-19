tnpm run build:apple_arm
tnpm run build:apple_x64
tnpm run build:linux_x64_gnu
rm -rf lib
mkdir lib
mv *.node ./lib/
cp index.* ./lib/