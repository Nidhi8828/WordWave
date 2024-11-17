<?php
require('pdf2text.php');
$fname = $argv[1];
$ext = pathinfo($fname, PATHINFO_EXTENSION);
if($ext == "pdf")
{
  $a = new PDF2Text();
  $a->setFilename($fname);
  $a->decodePDF();
  echo $a->output();
}
else
{
  echo "Error: Wrong file format!";
}
?>