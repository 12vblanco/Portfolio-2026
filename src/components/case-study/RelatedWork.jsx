import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  caseStudyPath,
  otherCaseStudies,
} from "../../data/caseStudiesMeta";
import { MONO } from "./primitives.jsx";

/* Sibling links at the foot of every case study. Without these the four study
   pages never pointed at each other: a reader who liked one had no route to the
   rest, and link equity pooled on the homepage instead of circulating through
   the cluster. Mirrors the "Related insights" block on the article pages.

   `slug` is the study being read, which is the one left out. */
export const RelatedWork = ({ slug }) => {
  const others = otherCaseStudies(slug);
  if (!others.length) return null;

  return (
    <Wrap data-reveal aria-labelledby="more-work">
      <Head id="more-work">More work</Head>
      <Grid>
        {others.map((study) => (
          <Card key={study.slug} to={caseStudyPath(study.slug)}>
            <CardTag>
              {study.client} · {study.tag}
            </CardTag>
            <CardTitle>{study.cardTitle}</CardTitle>
            <CardIntro>{study.cardIntro}</CardIntro>
            <CardSpacer />
            <CardMore aria-hidden="true">Read the case study →</CardMore>
          </Card>
        ))}
      </Grid>
      <AllLink to="/work">See all work →</AllLink>
    </Wrap>
  );
};

const Wrap = styled.section`
  margin: 3.5rem 0 0;
`;

const Head = styled.h2`
  font-family: ${MONO};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #888;
  margin: 0 0 1.25rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(Link)`
  /* Column + auto margin on the footer keeps "Read the case study" on one
     baseline across cards whose intros run to different lengths. */
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  background: #fffefa;
  text-decoration: none;
  transition: border-color 0.2s ease, transform 0.2s ease;
  &:hover {
    border-color: #ff3863;
    transform: translateY(-2px);
  }
  &:focus-visible {
    outline: 2px solid #ff3863;
    outline-offset: 2px;
  }
`;

const CardTag = styled.span`
  display: block;
  font-family: ${MONO};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ff3863;
  margin-bottom: 0.6rem;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 800;
  /* Reset the global display-heading tracking (h3 is -1px). */
  letter-spacing: -0.2px;
  color: #282828;
  margin: 0 0 0.5rem;
  line-height: 1.25;
`;

const CardIntro = styled.p`
  font-size: 0.92rem;
  line-height: 1.5;
  color: #555;
  margin: 0 0 1rem;
`;

const CardSpacer = styled.span`
  flex: 1;
`;

const CardMore = styled.span`
  font-family: ${MONO};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #282828;
`;

const AllLink = styled(Link)`
  display: inline-block;
  margin-top: 1.5rem;
  font-family: ${MONO};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #282828;
  &:hover {
    color: #ff3863;
  }
`;
