export var GradeImage;
(function (GradeImage) {
    GradeImage["Matelot"] = "/assets/MO1.jpg";
})(GradeImage || (GradeImage = {}));
export function getImage(grade) {
    return GradeImage[grade];
}
