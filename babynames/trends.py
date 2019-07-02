"""
Computes the distributional similarity between names.
"""

# number of similar names to store
SIZE = 15


def l1(q, r):
    score = 0.0
    for v in range(len(q)):
        score += abs(q[v] - r[v])
    return score

def l2(q, r):
    score = 0.0
    for v in range(len(q)):
        score += (q[v] - r[v]) ** 2
    return score ** 0.5

def cos(q, r):
    num = 0.0
    qss = 0.0
    rss = 0.0
    for v in range(len(q)):
        num += q[v] * r[v]
        qss += q[v] ** 2
        rss += r[v] ** 2
    return num / (qss ** 0.5) / (rss ** 0.5)

def hmb(q, r):
    score = 0.0
    for v in range(len(q)):
        score += (q[v] ** 0.5 - r[v] ** 0.5) ** 2
    return score ** 0.5


def main(norms):
    # for every name n with rates q
    for n, q in sorted(norms.iteritems()):
        temp = []
        # for every other name o with rates r
        for o, r in norms.iteritems():
            # compute the L2 distance from q to r
            score = 0.0
            for v in range(len(q)):
                score += (q[v] - r[v]) ** 2
            temp.append([score ** 0.5, o])
        # output the top matches (besides n itself)
        temp = sorted(temp)[1:SIZE+1]
        out.write("    '{0}': {1},\n".format(n, temp))


if __name__ == "__main__":

    print "Reading counts.js"
    execfile("counts.js")
    print "Normalizing data"
    f_norms = {}
    for key, rec in f_counts.iteritems():
        f_norms[key] = [1.0 * rec[i] / f_totals[i] for i in range(len(rec))]
    m_norms = {}
    for key, rec in m_counts.iteritems():
        m_norms[key] = [1.0 * rec[i] / m_totals[i] for i in range(len(rec))]

    out = open("trends.js", "w")
    print "Analyzing female names"
    out.write("f_trends = {\n")
    main(f_norms)
    out.write("};\n\n")
    print "Analyzing male names"
    out.write("m_trends = {\n")
    main(m_norms)
    out.write("};\n")
    out.close()
