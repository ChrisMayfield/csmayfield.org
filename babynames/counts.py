"""
Builds a map of all names and their frequencies each year.
Data source: http://www.ssa.gov/oact/babynames/limits.html
"""

import glob

# filter out names with fewer than MINSUM total instances
MINSUM = 5000


def main():
    # process original national data files
    files = sorted(glob.glob("names/*.txt"))
    years = [int(fn[-8:-4]) for fn in files]
    # build a dictionary of names and counts
    f_counts = {}
    m_counts = {}
    f_totals = [0] * len(years)
    m_totals = [0] * len(years)
    for fn in files:
        # get column index of current year
        idx = years.index(int(fn[-8:-4]))
        for line in open(fn):
            toks = line.split(',')
            key = toks[0]
            cnt = int(toks[2])
            # aggregate by gender
            if toks[1] == 'F':
                counts = f_counts
                f_totals[idx] += cnt
            else:
                counts = m_counts
                m_totals[idx] += cnt
            # update name for this year
            try:
                rec = counts[key]
            except KeyError:
                rec = [0] * len(years)
                counts[key] = rec
            rec[idx] = cnt
    # output total counts by year
    out = open("counts.js", "w")
    out.write("f_totals = " + str(f_totals) + ";\n\n")
    out.write("m_totals = " + str(m_totals) + ";\n\n")
    # output female counts by name
    out.write("f_counts = {\n")
    cnt = 0
    for key, rec in sorted(f_counts.iteritems()):
        if sum(rec) >= MINSUM:
            out.write("    '{0}': {1},\n".format(key, rec))
            cnt += 1
    out.write("};\n\n")
    print "{0} / {1} female names".format(cnt, len(f_counts))
    # output male counts by name
    out.write("m_counts = {\n")
    cnt = 0
    for key, rec in sorted(m_counts.iteritems()):
        if sum(rec) >= MINSUM:
            out.write("    '{0}': {1},\n".format(key, rec))
            cnt += 1
    out.write("};\n")
    print "{0} / {1} male names".format(cnt, len(m_counts))
    out.close()


if __name__ == "__main__":
    main()
