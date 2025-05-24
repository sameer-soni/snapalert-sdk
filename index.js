const axios = require("axios");

let apiKey = "";

let config = {
  errorThreshold: 5,
  intervalMinutes: 1,
};

let errLogs = [];

/**
 * Sets the API key for snapAlert
 * @param {string} key - Your secret API key
 */
function setApiKey(key) {
  if (!key || key.trim() == "") {
    throw new Error("[snapAlert] Invalid api key in function->setApiKey");
  }

  apiKey = key;
}

/**
 * Sets configuration options for SnapAlert.
 *
 * @param {Object} userConfig - The configuration options.
 * @param {number} [userConfig.errorThreshold] - Number of errors before triggering alert (must be > 1).
 * @param {number} [userConfig.intervalMinutes] - Time window in minutes to count errors (must be > 0).
 * @returns {void}
 */
function setConfig(userConfig) {
  if (typeof userConfig !== "object") {
    console.error(
      "[snapAlert] Config must be an object. (params passed in setConfig must be of type object)"
    );
  }

  if (userConfig.errorThreshold && userConfig.errorThreshold > 1)
    config.errorThreshold = userConfig.errorThreshold;
  else console.error("[snapAlert] errorThreshold can't be negative.");

  if (userConfig.intervalMinutes && userConfig.intervalMinutes > 0)
    config.intervalMinutes = userConfig.intervalMinutes;
  else console.error("[snapAlert] intervalMinutes can't be negative");
}

/**
 * Logs an error message and triggers alert(s) if error threshold is reached within the configured time window.
 *
 * @param {string} errMsg - The error message to log and potentially alert on.
 * @param {Object} [callMethod] - Optional settings for which alert methods to use.
 * @param {string[]} [callMethod.alertMethods] - Array of alert methods to trigger ("call", "msg", "mail").
 * @throws {Error} If API key is not set or invalid parameters are provided.
 * @returns {void}
 */
function alertOnError(errMsg, callMethod = {}) {
  if (!apiKey) throw new Error("[snapAlert] Api key not found");

  if (typeof callMethod !== "object")
    throw new Error("[snapAlert] callMethod must be an object.");

  const { alertMethods = [] } = callMethod;

  const validMethods = ["call", "msg", "mail"];

  if (!Array.isArray(alertMethods)) {
    throw new Error("[snapAlert] alertMethods must be an array");
  }

  for (const method of alertMethods) {
    if (!validMethods.includes(method)) {
      throw new Error(`[snapAlert] Invalid alert method: ${method}`);
    }
  }

  const currentTime = Date.now();

  const windowStart = currentTime - config.intervalMinutes * 60 * 1000;
  errLogs = errLogs.filter((timestamp) => timestamp >= windowStart);

  errLogs.push(currentTime);

  if (errLogs.length >= config.errorThreshold) {
    const payload = {
      apiKey,
      errMsg,
      timestamp: new Date().toISOString(),
    };

    if (alertMethods.length > 0) {
      payload.alertMethods = alertMethods;
    }

    axios
      .post("https://api.syncverse.site/api/report-error", payload)
      .then(() => {
        console.log("[snapAlert] error reported");
        errLogs = [];
      })
      .catch((err) => console.error("[snapAlert] failed to report error", err));
  }
}

module.exports = {
  setApiKey,
  setConfig,
  alertOnError,
};
