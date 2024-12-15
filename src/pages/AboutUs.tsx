import React from "react";
import {
  Box,
  Button,
  Paper,
  Card,
  CardContent,
  Zoom,
  Fade,
} from "@mui/material";
import Typography from "../components/sharedComponents/Typography";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const AboutUs: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Box className="bg-paper dark:bg-dark-paper py-16 max-h-full flex items-center justify-center">
      <div className="px-4 md:px-8 flex flex-col items-center justify-center">
        {/* Header Section */}
        <Fade in timeout={1000}>
          <div>
            <Typography
              variant="h1"
              className="text-3xl md:text-5xl font-normal mb-8 text-gray-800 text-center"
              gutterBottom
            >
              About{" "}
              <Box component="div" className="inline text-primary font-medium">
                Showcase
              </Box>
            </Typography>
          </div>
        </Fade>
        <Fade in timeout={1500}>
          <div>
            <Typography
              variant="h3"
              className="text-xl md:text-2xl font-medium mb-6 text-gray-700 text-center"
              gutterBottom
            >
              Connecting Developers, Building the Future Together
            </Typography>
          </div>
        </Fade>
        <Fade in timeout={2000}>
          <div>
            <Box className="md:max-w-[60%] max-w-[80%] mx-auto text-gray-600 mb-8 md:mb-8">
              <Typography paragraph className="mb-4 text-base md:text-lg">
                Showcase is more than just a platform; it's a movement designed
                to empower developers worldwide. Our mission is to foster a
                global community where creativity thrives, ideas converge, and
                collaboration leads to innovation.
              </Typography>
              <Typography paragraph className="text-base md:text-lg">
                With Showcase, you can share your work, inspire others, and find
                the motivation to achieve your best. Join us as we redefine
                what's possible in the tech world!
              </Typography>
            </Box>
          </div>
        </Fade>

        {/* Our Values Section */}
        <Box mb={4}>
          <Typography
            variant="h3"
            className="text-xl md:text-2xl font-medium mb-2 text-gray-700 text-center"
          >
            Our Core Values
          </Typography>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                icon: "🤝",
                title: "Collaboration",
                description:
                  "We believe great things happen when people come together. Collaboration is at the heart of everything we do.",
              },
              {
                icon: "💡",
                title: "Innovation",
                description:
                  "Innovation drives progress. We encourage creativity and support new ideas to shape a better future.",
              },
              {
                icon: "🫂",
                title: "Inclusivity",
                description:
                  "Showcase is a community for everyone. We celebrate diversity and create opportunities for all developers.",
              },
              {
                icon: "✨",
                title: "Transparency",
                description:
                  "Honesty and openness build trust. We value transparency in our actions and communications.",
              },
              {
                icon: "💯",
                title: "Quality",
                description:
                  "Excellence is our standard. We are committed to delivering the highest quality experience for our users.",
              },
            ].map((value, index) => (
              <Zoom in timeout={500 + index * 200} key={index}>
                <div className="flex flex-col items-center justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                  <Card
                    elevation={3}
                    sx={{
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                    className="flex flex-col items-center p-6 bg-paper-light dark:bg-dark-paper-light"
                  >
                    <CardContent className="flex flex-col items-center">
                      <Typography
                        variant="h4"
                        className="text-4xl mb-2"
                        sx={{
                          transition: "color 0.3s ease",
                          "&:hover": {
                            color: "#007BFF",
                          },
                        }}
                      >
                        {value.icon}
                      </Typography>
                      <Typography
                        variant="h6"
                        className="font-bold mb-2 text-center"
                      >
                        {value.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="text-center"
                      >
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Zoom>
            ))}
          </div>
        </Box>

        {/* Vision Section */}
        <Box mb={4}>
          <Typography
            variant="h3"
            className="text-xl md:text-2xl font-medium mb-4 text-gray-700 text-center"
          >
            Our Vision
          </Typography>
          <Zoom in timeout={2500}>
            <Box className="max-w-3xl mx-auto">
              <Paper
                elevation={2}
                className="p-6"
                sx={{
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Typography variant="body1" className="text-gray-600 text-lg">
                  We envision Showcase as the leading platform for developers,
                  revolutionizing how the tech industry connects and
                  collaborates. By bridging gaps, fostering talent, and
                  inspiring innovation, Showcase is paving the way for a
                  brighter tech future.
                </Typography>
              </Paper>
            </Box>
          </Zoom>
        </Box>

        {/* Call to Action */}
        <Box textAlign="center" mt={2}>
          {isAuthenticated ? (
            <Typography variant="h6" color="textSecondary">
              🎉 Welcome back! You're already part of the Showcase community.
              Keep exploring and inspiring others!
            </Typography>
          ) : (
            <Fade in timeout={3000}>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={Link}
                  to="/sign_up"
                  sx={{
                    padding: "10px 20px",
                    fontSize: "1.2rem",
                    borderRadius: "8px",
                    textTransform: "none",
                    animation: "pulse 1.5s infinite",
                    "@keyframes pulse": {
                      "0%": {
                        boxShadow: "0 0 0 0 rgba(117, 115, 197, 0.4)", // Primary color with transparency
                      },
                      "70%": {
                        boxShadow: "0 0 10px 20px rgba(117, 115, 197, 0)", // Primary color with no transparency at 70%
                      },
                      "100%": {
                        boxShadow: "0 0 0 0 rgba(117, 115, 197, 0)", // Reset to no shadow
                      },
                    },
                  }}
                >
                  Join Our Community Today
                </Button>
              </div>
            </Fade>
          )}
        </Box>
      </div>
    </Box>
  );
};

export default AboutUs;
