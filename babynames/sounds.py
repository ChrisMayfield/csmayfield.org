"""
Groups names by how they sound based on double metaphone.
"""

from metaphone import dm


def main(prefix):
    phones = {}
    sounds = {}
    # analyze by gender
    if prefix == 'f':
        counts = f_counts
    else:
        counts = m_counts
    for name in counts:
        # update both maps
        code = dm(name)[0]
        phones[name] = code
        try:
            lst = sounds[code]
            lst.append(name)
        except KeyError:
            lst = [name]
            sounds[code] = lst
    # output the results
    out.write(prefix + "_phones = {\n")
    for name, code in sorted(phones.iteritems()):
        out.write("    '{0}': '{1}',\n".format(name, code))
    out.write("};\n\n")
    out.write(prefix + "_sounds = {\n")
    for code, lst in sorted(sounds.iteritems()):
        out.write("    '{0}': {1},\n".format(code, sorted(lst)))
    out.write("};\n")


if __name__ == "__main__":
    print "Reading counts.js"
    execfile("counts.js")
    out = open("sounds.js", "w")
    print "Analyzing female names"
    main('f')
    out.write('\n')
    print "Analyzing male names"
    main('m')
    out.close()
