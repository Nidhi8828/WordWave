<?php
// Check if the file was uploaded
if (isset($_FILES['pdf']) && $_FILES['pdf']['error'] == 0) {

    // Get the uploaded file's name
    $fname = basename($_FILES['pdf']['name']);
    // Get the file extension
    $ext = pathinfo($fname, PATHINFO_EXTENSION);

    // Check if the file is a PDF
    if ($ext == "pdf") {
        // Initialize the PDF2Text class and process the file
        $a = new PDF2Text();
        // Get the full file path
        $a->setFilename($_FILES['pdf']['tmp_name']);
        // Decode the PDF
        $a->decodePDF();
        // Output the extracted text
        echo $a->output();
    } else {
        echo "Error: Wrong file format!";
    }

} else {
    echo "Error: No file uploaded or upload error!";
}
?>
