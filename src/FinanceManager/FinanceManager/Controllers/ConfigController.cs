using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinanceManager.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ConfigController : Controller
	{
		[HttpGet("[action]")]
		public IActionResult FinanceApiUrl()
		{
			string url = Environment.GetEnvironmentVariable("finance_api_url");
			if (!string.IsNullOrEmpty(url))
			{
				if (!url.Contains("api"))
					url = new Uri(new Uri(url), "api").AbsoluteUri;

				if (!url.EndsWith('/'))
					url += '/';

				return Json(url);
			}

			return Json("http://localhost:5001/api/");
		}
	}
}
