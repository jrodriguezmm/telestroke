set -e

echo "Creacion de imagen melab"


#Borrado de carpeta base
rm -R melab || true
mkdir melab
cd melab

echo "Clonando melab"
git init
git config user.email "j.rodriguezm@uniandes.edu.co"
git config user.name "jrodriguezmm"
git pull https://jrodriguezmm:97db9999e210960a3502d9b7fda08bc0cff1396e@github.com/UniandesDSIT/sw-melab.git
cp db/db.sql ../db.sql
mv images _images
rm -R .git

cd ..
##Comprimiendo fuente base de la plantilla descargado de repositorio
cd melab/ && tar -zcvf ../melab.tar . && cd ..
docker build . -t docker.pkg.github.com/uniandesdsit/docker-sw--melab/melab:1.0.1
exec "$@"
