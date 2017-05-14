#!/bin/bash

# Sort contributors alphabetically, then contributors by contributions.lenght
# Sort contributions alphabetically
cat .all-contributorsrc  | \
jq '.contributors = (.contributors | sort_by(.login) )' | \
jq '.contributors = (.contributors | sort_by( -(.contributions | length) ) )' | \
jq '.contributors = [(.contributors[] | .contributions = (.contributions| sort))]' > tmp
mv tmp .all-contributorsrc

# Generate new markdown table from .all-contributorsrc
all-contributors generate

# Remove old html table
sed -ie '/<table>/,/<\/table>/d' CONTRIBUTORS.md 

# Convert markdown table to html and adjust width and alignment
echo "<table>" > tmptable.html
pandoc CONTRIBUTORS.md | \
hquery -p -r '
  $("th,td").each(function() {
    $(this).attr("width", "150px")
    $(this).attr("valign", "top")
  })
  $("table").html()
' >> tmptable.html
echo "</table>" >> tmptable.html

# Insert new html table
sed -ie '/<!-- ALL-CONTRIBUTORS-LIST:END -->/ r tmptable.html' CONTRIBUTORS.md

# Remove markdown table (but keep comments for later inserts)
sed -ie '/<!-- ALL-CONTRIBUTORS-LIST:START.*-->/,/<!-- ALL-CONTRIBUTORS-LIST:END -->/{//!d}' CONTRIBUTORS.md

# Replace specific repo url (i.e. bionode/bionode) with overall contributions
sed -ie 's|https://github.com/bionode/bionode/issues?q=author%3A|#contributions-|g' CONTRIBUTORS.md
sed -ie 's|https://github.com/bionode/bionode/commits?author=|#contributions-|g' CONTRIBUTORS.md

# Remove contributors commits (will add later with other script, see package.json) 
sed -ie '/# Contributors commits per repository/,$d' CONTRIBUTORS.md

# Remove tmp files
rm -f CONTRIBUTORS.mde tmptable.html
