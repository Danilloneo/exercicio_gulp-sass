const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourceMaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const imagemin = require ('gulp-imagemin');

//Compilando o Sass com o Gulp após instalar as dependencias e criar as pastas
//Aqui o CSS sai minificado por conta da função de saida outputStyle = compressed;

function compilaSass(){
    return gulp.src('./source/styles/main.scss')
    .pipe(sourceMaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }

    ))
    .pipe(sourceMaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'));
}

//comprime e diminui tamanho imagens
//Dependencia imagemin

function comprimeImages(){
    return gulp.src('source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'))
}

//comprime javascript colocando tudo em uma linha
//Dependencia Uglify
//Caso a gente queira obfuscar o código precisamos instalar o obfuscate
//npm install --save-dev gulp-obfuscate
//e a pós isso chamar a função e criar os pipes de obfuscação.

function comprimeJavascript () {
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts'));
}

//exportando as funções para que possa ser executanda no npm run gulp 

exports.default = function () {
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJavascript));
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(comprimeImages));
}
