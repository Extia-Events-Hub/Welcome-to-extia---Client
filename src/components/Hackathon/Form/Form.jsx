import React, { useState, useRef} from "react";
import "./Form.scss"

import { t } from "i18next";
import { 
  ThemeProvider, 
  Button, 
  TextField, 
  FormControlLabel, 
  Checkbox, 
  Grid, 
  Box, 
  createTheme,
} from "@mui/material";

import Confettii from 'react-dom-confetti';

/**
 * Be careful, this component triggers a form update on a disabled backend endpoint.
 */

function UserData({ target, showPhoneNumber }) {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="given-name"
          name={`${target}.firstName`}
          required
          fullWidth
          id={`${target}.firstName`}
          label={t("hackathonFirstName")}
          autoFocus
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id={`${target}.lastName`}
          label={t("hackathonLastName")}
          name={`${target}.lastName`}
          autoComplete="family-name"
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          type="email"
          id={`${target}.email`}
          label={t("hackathonEmail")}
          name={`${target}.email`}
          autoComplete="email"
          variant="standard"
        />
      </Grid>
      {showPhoneNumber && <Grid item xs={12}>
          <TextField
            fullWidth
            id={`${target}.phone`}
            label={t("hackathonPhone")}
            name={`${target}.phone`}
            autoComplete="tel"
            variant="standard"
          />
        </Grid>
      }
    </>
  );
}

export default function Form() {
    const form = useRef(null)
    const [hasDuo, setHasDuo] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const confettiConfig = {
      angle: 90,
      spread: 360,
      startVelocity: 40,
      elementCount: 170,
      dragFriction: 0.12,
      duration: 3000,
      stagger: 3,
      width: "10px",
      height: "10px",
      perspective: "1100px",
      colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
    }
    const theme = createTheme({
      palette: {
        primary: {
          main: "#FC9254",
          contrastText: "#fff"
        },
      },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(form.current);

        const data = Object.fromEntries(formData.entries());
        const lang = navigator.language.slice(0,2)?navigator.language.slice(0,2):'en';
        const formattedData = Object.keys(data).reduce((acc, key) => {
          const [target, field] = key.split(".");
          return {
            lang,
            ...acc,
            [target]: {
              ...acc[target],
              [field]: data[key]
            }
          }
        }, {})

        setLoading(true)
        await fetch(`${process.env.REACT_APP_API_URL}/hackathon`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formattedData)
        })

        setSuccess(true)
        setLoading(false)
    }

    return (
      <ThemeProvider theme={theme} >
          <Box ref={form} component="form" onSubmit={handleSubmit} className="containerForm">
          <h2>{t("hackathonSignIn")}</h2>
            <Grid container spacing={2}>
              <UserData target="me" showPhoneNumber={true} />
              <Grid item xs={12}>
                <FormControlLabel
                  checked={hasDuo}
                  control={<Checkbox />}
                  label={t("hackathonDuo")}
                  onChange={() => setHasDuo(!hasDuo)}
                />
                {!hasDuo && <p><strong>{t("hackathonNoDuo")}</strong></p>}
              </Grid>
              {hasDuo && <UserData target="duo" showPhoneNumber={false} />}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading || success}
            >
              {success ? t("hackathonthanks") : t("hackathonSend")}
              <Confettii active={success} config={confettiConfig} />
            </Button>
            {success ? 
              <div className="confirmInscription">{t("hackathonConfirmInscription") }</div> 
            : null}

      
          </Box>
      </ThemeProvider>
    );
}